import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
	const formData = await request.json();
	const type = formData.type as string;
	const page = Number(formData.page);

	const [form, pagesTotal] = await prisma.$transaction([
		prisma.forms.findFirst({
			where: {
				formtype: type,
			},
			take: 1,
			skip: page - 1,
		}),
		prisma.forms.count({ where: { formtype: type } }),
	]);

	return new NextResponse(JSON.stringify([form, { pagesTotal }]), {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	});
}

export async function DELETE(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get('id');

	if (!id)
		return new NextResponse(JSON.stringify({ status: '404' }), {
			status: 404,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'DELETE',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			},
		});

	await prisma.forms.delete({
		where: {
			id,
		},
	});

	return new NextResponse(JSON.stringify({ status: '200' }), {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'DELETE',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	});
}
